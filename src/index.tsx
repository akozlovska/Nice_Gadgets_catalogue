import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import './index.scss';
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Root />);
