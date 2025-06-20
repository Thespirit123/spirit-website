import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const ElectricitySkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-8 px-4 sm:px-8">
          <div className="h-2 bg-gray-200 rounded-md w-full animate-pulse" />
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-1/4 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-1/4 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-1/4 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-1/4 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse" />
          </div>
          <div className="h-12 bg-gray-300 rounded-md w-full mt-4 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
};