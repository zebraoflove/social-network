import MainApp from './App';
import ReactDOM from "react-dom";
test('renders starts without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MainApp />, div)
  ReactDOM.unmountComponentAtNode(div)
});
