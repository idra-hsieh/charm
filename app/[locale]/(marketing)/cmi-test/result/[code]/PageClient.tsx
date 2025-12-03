"use client";

interface Props {
  code: string;
}

export default function PageClient({ code }: Props) {

  return (
    <div>
      <h1>Result Code: {code}</h1>
    </div>
  );
}