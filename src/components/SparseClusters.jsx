import React from 'react';

/* Intentionally restrained identity motif: nine circles in one loose cluster.
   Pure decoration — not a map, chart, dataset or measurable diagram. */
export function SparseClusters({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 460 460" fill="none" className={className}>
      <circle cx="232" cy="225" r="84" fill="#2AA99D" opacity="0.88" />
      <circle cx="354" cy="150" r="52" fill="#E98D88" opacity="0.93" />
      <circle cx="341" cy="302" r="61" fill="#A8CD50" opacity="0.9" />
      <circle cx="138" cy="125" r="40" fill="#F08061" opacity="0.95" />
      <circle cx="112" cy="299" r="31" fill="#315A7A" />
      <circle cx="279" cy="84" r="24" fill="#D8E29D" opacity="0.9" />
      <circle cx="194" cy="375" r="27" fill="#E98D88" opacity="0.85" />
      <circle cx="415" cy="246" r="16" fill="#2AA99D" opacity="0.7" />
      <circle cx="61" cy="211" r="17" fill="#A8CD50" opacity="0.75" />
    </svg>
  );
}
