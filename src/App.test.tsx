import MainApp from './App';
import {createRoot} from "react-dom/client";
test('renders starts without crashing', () => {
  const div = document.createElement("div")
  const root = createRoot(div);
  root.render(<MainApp/>)
  root.unmount()
});
