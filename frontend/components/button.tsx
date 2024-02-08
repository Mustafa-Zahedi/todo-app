"use client";

export default function Button({ id, classes, handleClick, children }: any) {
  return <button onClick={() => handleClick()}>{children}</button>;
}
