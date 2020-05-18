import React from 'react';

const StickyStateService = {
    useStickyState(defaultValue, key) {
        const [value, setValue] = React.useState(() => {
          const stickyValue = window.localStorage.getItem(key);
          return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
        });
        
        React.useEffect(() => {
          window.localStorage.setItem(key, JSON.stringify(value));
        }, [key, value]);

        return [value, setValue];
    },
    clearStickyState(fields) {
        fields.forEach(field => {
            window.localStorage.removeItem(field)
        })
    }
}

export default StickyStateService;