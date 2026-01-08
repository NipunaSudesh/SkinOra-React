import Button from "./Components/Theme/Botton";
import TextInput from "./Components/Theme/TextInput";
import TextArea from "./Components/Theme/Textarea";
import Typography from "./Components/Theme/Typography";

function App() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-blue-100 p-6">
      
      <Typography variant="H1">SkinOra</Typography>
      <Typography >Tailwind common components test</Typography>

      <TextInput placeholder="Enter your name" />
      <TextArea placeholder="Enter description" />

      <div className="flex gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>

    </div>
  );
}

export default App;
