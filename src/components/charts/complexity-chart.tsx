"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

type ComplexityChartProps = {
  language: string;
};

const COMPLEXITIES = [
  { label: "Search", score: 2.5 },
  { label: "Sort", score: 4.2 },
  { label: "Hashing", score: 1.8 },
  { label: "Traversal", score: 2.1 },
  { label: "Dynamic Prog.", score: 5.4 },
] as const;

export function ComplexityChart({ language }: ComplexityChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = ref.current.clientWidth || 640;
    const height = 260;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const x = d3
      .scaleBand<string>()
      .domain(COMPLEXITIES.map((entry) => entry.label))
      .range([margin.left, width - margin.right])
      .padding(0.22);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(COMPLEXITIES, (d) => d.score) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleLinear<string>()
      .domain([1.5, 5.5])
      .range(["#0ea5e9", "#f97316"]);

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr("aria-label", `${language} algorithm complexity comparison chart`);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .call((g) => g.selectAll("text").style("font-size", "12px"));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .call((g) => g.selectAll("text").style("font-size", "12px"));

    svg
      .append("g")
      .selectAll("rect")
      .data(COMPLEXITIES)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.label) ?? 0)
      .attr("y", () => y(0))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("rx", 8)
      .attr("fill", (d) => color(d.score))
      .transition()
      .duration(550)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.score))
      .attr("height", (d) => height - margin.bottom - y(d.score));

    svg
      .append("g")
      .selectAll("text.value")
      .data(COMPLEXITIES)
      .enter()
      .append("text")
      .text((d) => d.score.toFixed(1))
      .attr("x", (d) => (x(d.label) ?? 0) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.score) - 6)
      .attr("text-anchor", "middle")
      .attr("font-size", 11)
      .attr("fill", "#334155");
  }, [language]);

  return (
    <div className="mt-6 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">
        D3 Algorithm Complexity Pulse
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Relative complexity pressure for common patterns in {language}{" "}
        workloads.
      </p>
      <svg className="mt-3 w-full" ref={ref} />
    </div>
  );
}
