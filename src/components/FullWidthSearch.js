import i18n from '@src/i18n.js';
import React, { forwardRef } from 'react';
import { Icon } from 'react-native-ui-kitten';
import DebouncedInput from '@components/DebouncedInput.js';

export default forwardRef((props, ref) => {
    return (
        <DebouncedInput
            ref={ref}
            placeholder={i18n.t('Enter criteria to search...')}
            onIconPress={() => {
                props.set('');
                props.setShowSearch(false)
            }}
            icon={() => (
                <Icon name="times" size={22} color="#000" style={{ opacity: .4 }} />
            )}
            style={{
                zIndex: 1,
                borderRadius: 0,
                borderColor: 'white',
        
                elevation: 3,
                shadowRadius: 4,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 2 },
            }}
            {...props}
        />
    );
});
