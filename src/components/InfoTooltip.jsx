
import { useState } from 'react';

export default function InfoTooltip({ text, label = 'More information' }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <span className="tooltip-wrapper">
            <button
                type="button"
                className="info-tooltip-trigger"
                aria-label={label}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
                onBlur={() => setIsOpen(false)}
            >
                i
            </button>

            <span
                className={`info-tooltip-content ${isOpen ? 'is-visible' : ''}`}
                role="tooltip"
            >
                {text}
            </span>
        </span>
    );
}
