interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-[#0f4a5c] mb-4 relative inline-block">
        {title}
        <span className={`absolute -bottom-2 h-1 bg-[#b8860b] rounded-full ${centered ? 'left-1/2 -translate-x-1/2 w-24' : 'left-0 w-24'}`}></span>
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
