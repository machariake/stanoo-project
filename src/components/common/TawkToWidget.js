import React, { useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

const TawkToWidget = () => {
    const { settings } = useSettings();

    useEffect(() => {
        // Only load Tawk.to if it's enabled and we have the required IDs
        if (!settings?.enableTawkTo || !settings?.tawkToPropertyId) {
            return;
        }

        const widgetId = settings.tawkToWidgetId || 'default';
        const propertyId = settings.tawkToPropertyId;

        // Check if Tawk.to is already loaded
        if (window.Tawk_API) {
            return;
        }

        // Load Tawk.to script
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();

        (function () {
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();

        // Cleanup function
        return () => {
            // Remove Tawk.to widget when component unmounts
            const tawkScript = document.querySelector(`script[src*="embed.tawk.to"]`);
            if (tawkScript) {
                tawkScript.remove();
            }
            // Remove the widget iframe
            const tawkWidget = document.getElementById('tawkchat-container');
            if (tawkWidget) {
                tawkWidget.remove();
            }
            delete window.Tawk_API;
            delete window.Tawk_LoadStart;
        };
    }, [settings?.enableTawkTo, settings?.tawkToPropertyId, settings?.tawkToWidgetId]);

    // This component doesn't render anything visible
    return null;
};

export default TawkToWidget;
