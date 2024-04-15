/** Credits
 * @author: https://github.com/sarat9
 * @link https://github.com/sarat9/react-custom-hooks/blob/master/hooks/useClickOutside.jsx
 */

import React from 'react';

export const useClickOutside = (elementRef, callback) => {
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (elementRef && elementRef.current && !elementRef.current.contains(event.target)) {
                callback()
            }
            return
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [elementRef, callback])
}
