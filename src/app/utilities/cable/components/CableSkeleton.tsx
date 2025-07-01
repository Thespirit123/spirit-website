import { Card, CardContent } from "@/components/ui/card";

export const CableSkeleton = () => {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="mb-8 px-4 sm:px-8">
                    <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse" />
                </div>
                <div className="space-y-6 animate-pulse">
                    <div className="h-12 bg-gray-200 rounded-md" />
                    <div className="h-12 bg-gray-200 rounded-md" />
                    <div className="h-12 bg-gray-200 rounded-md" />
                    <div className="h-12 bg-gray-200 rounded-md w-1/2 mx-auto" />
                    <div className="h-12 bg-gray-200 rounded-md" />
                </div>
            </CardContent>
        </Card>
    );
};