import { formatDate } from "@/lib/utils";
import { Confession } from "@/services/confessions";
// @ts-expect-error - required for canvas-sketch to work
import canvasSketch, { SketchManager } from 'canvas-sketch';
import { saveAs } from 'file-saver';
import { ClipboardIcon, Download, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface ConfessionModalProps {
    confession: Confession;
    onClose: () => void;
}

const ConfessionModal: React.FC<ConfessionModalProps> = ({
    confession,
    onClose,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sketchRef = useRef<SketchManager | null>(null);
    const templateImage = useRef(new Image());
    const [isDrawingComplete, setIsDrawingComplete] = useState(false);
    const [imageLoadError, setImageLoadError] = useState<string | null>(null);

    const handleCopyToClipboard = useCallback(() => {
        navigator.clipboard
            .writeText(confession.content)
            .then(() => {
                toast.success("Confession copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy confession: ", err);
                toast.error("Failed to copy confession.");
            });
    }, [confession.content]);

    const handleDownload = useCallback(async () => {
        if (!canvasRef.current) {
            toast.error("Canvas not initialized.");
            return;
        }

        if (!isDrawingComplete) {
            toast("Please wait, generating image...");
            return;
        }

        try {
            const dataURL = canvasRef.current.toDataURL('image/jpeg', 0.9);
            saveAs(dataURL, `confession-${confession.id}.jpg`);
        } catch (error) {
            console.error("Error during download:", error);
            toast.error("Failed to download image.");
        }
    }, [confession.id, isDrawingComplete]);

    useEffect(() => {
        let didCancel = false;

        templateImage.current.src = '/confession-template.jpg';

        templateImage.current.onload = async () => {
            if (didCancel) return;

            setImageLoadError(null);
            const canvasWidth = templateImage.current.width;
            const canvasHeight = templateImage.current.height;

            const settings = {
                dimensions: [canvasWidth, canvasHeight],
                exportPixelRatio: 2,
                canvas: canvasRef.current,
            };

            const sketch = ({ context, width, height }: { context: CanvasRenderingContext2D, width: number, height: number }) => {
                context.drawImage(templateImage.current, 0, 0, width, height);

                context.font = '70px Arial';
                context.fillStyle = 'black';
                context.textAlign = 'center';
                context.textBaseline = 'middle';

                const text = confession.content;
                const maxWidth = width - 40;
                const words = text.split(' ');
                let line = '';
                let y = height / 2 - 50;

                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = context.measureText(testLine);
                    const testWidth = metrics.width;

                    if (testWidth > maxWidth && n > 0) {
                        context.fillText(line, width / 2, y);
                        line = words[n] + ' ';
                        y += 30;
                    } else {
                        line = testLine;
                    }
                }
                context.fillText(line, width / 2, y);
            };

            try {
                const manager = await canvasSketch(sketch, settings);
                if (!didCancel) {
                    sketchRef.current = manager;
                    setIsDrawingComplete(true);
                } else {
                    manager.dispose();
                }
            } catch (error) {
                console.error("Canvas Sketch Error:", error);
                toast.error("Failed to generate image.");
            }
        };

        templateImage.current.onerror = () => {
            if (didCancel) return;
            toast.error("Failed to load template image.");
            setImageLoadError("Failed to load template image.");
        };

        return () => {
            didCancel = true;

            if (sketchRef.current) {
                try {
                    sketchRef.current.dispose();
                } catch (e) {
                    console.warn("Error disposing canvas-sketch:", e);
                }
            }
        };
    }, [confession.content]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-2xl font-semibold">View Confession</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">ID: # {confession.id}</span>
                        <span>Created At: {formatDate(confession.createdAt)}</span>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-md mb-4 flex justify-between">
                        <p className="text-gray-800">{confession.content}</p>
                        <button className="mt-2 text-gray-500 hover:text-gray-700">
                            <ClipboardIcon className="w-6 h-6" onClick={handleCopyToClipboard} />
                        </button>
                    </div>

                    {imageLoadError && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-sm text-red-700">
                            <p className="font-medium">Image Loading Error</p>
                            <p>{imageLoadError}</p>
                            <p className="mt-2">The download feature may not work properly.</p>
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                            pending
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDownload}
                                disabled={!!imageLoadError || !isDrawingComplete}
                                className={`${imageLoadError ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'} text-white px-4 py-2 rounded transition-colors`}
                            >
                                <Download className="w-4 h-4 mr-2 inline-block" />
                                Download
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default ConfessionModal;