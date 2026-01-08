import Button from "./Components/Theme/Botton";
import TextInput from "./Components/Theme/TextInput";
import TextArea from "./Components/Theme/Textarea";
import Typography from "./Components/Theme/Typography";
import MainLayout from "./Components/Layout/MainLayout";

function App() {
  return (
        <MainLayout>
        <div className="container-card min-h-screen flex flex-col gap-4 items-center justify-center">
      
      <Typography variant="h1" className="text-xl text-primary font-bold">Skin<span className="text-secondary">Ora</span></Typography>
      <Typography >Tailwind common components test</Typography>

      <TextInput placeholder="Enter your name" />
      <TextArea placeholder="Enter description" />

      <div className="flex gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>

    </div>
    </MainLayout>
  
  );
}

export default App;
