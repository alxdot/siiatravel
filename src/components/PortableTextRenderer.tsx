import React from "react";
import { PortableText } from "@portabletext/react";

type Props = {
  value: any;
};

export default function PortableTextRenderer({ value }: Props) {
  return <PortableText value={value} />;
}
