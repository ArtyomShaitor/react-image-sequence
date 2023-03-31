import './wdyr';
import { createRoot } from 'react-dom/client';

import App from './LandingPage/App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(<App />);
