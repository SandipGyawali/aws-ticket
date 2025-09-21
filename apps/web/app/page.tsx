"use client";
import { Input } from "@aws-ticket/ui/input";
import { Button } from "@aws-ticket/ui/button";

function Page() {
  return (
    <div className="bg-red-500">
      <Input></Input>
      sdf
      <h1 className="text-red-500">Hello World</h1>
      <Button
        onClick={() => {
          console.log("Hello");
        }}
      >
        Hello
      </Button>
    </div>
  );
}

export default Page;
