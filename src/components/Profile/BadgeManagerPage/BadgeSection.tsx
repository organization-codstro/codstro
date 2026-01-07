import React from "react";

interface BadgeSectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
  className?: string;
}

export default function BadgeSection({
  title,
  count,
  children,
  className = "",
}: BadgeSectionProps) {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        {title} ({count})
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
}
