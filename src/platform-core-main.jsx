import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './shared/lib/installTypography.js'
import { DesignViewport } from './shared/ui/design-viewport/index.js'
import { PlatformCorePage } from './pages/platform-core/PlatformCorePage.jsx'

createRoot(document.getElementById('root')).render(<StrictMode><DesignViewport><PlatformCorePage pageNavigation /></DesignViewport></StrictMode>)
