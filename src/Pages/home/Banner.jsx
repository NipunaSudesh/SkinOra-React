import React from "react";
import TextInput from "../../components/theme/TextInput";
import TextArea from "../../components/theme/Textarea";
import Typography from "../../components/theme/Typography";

export default function Banner() {
  return (
    <div className="container-card min-h-screen flex flex-col gap-4 items-center justify-center">
      <Typography variant="h1" className="text-xl text-primary font-bold">
        Skin<span className="text-secondary">Ora</span>
      </Typography>

      <Typography>Tailwind common components test</Typography>

      <TextInput placeholder="Enter your name" />
      <TextArea placeholder="Enter description" />
    </div>
  );
}
