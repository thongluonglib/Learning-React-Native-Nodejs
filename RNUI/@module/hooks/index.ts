import useDebouncedCallback from "./useDebouncedCallback";

export { useDebouncedCallback }

// -- useDebouncedCallback --

/*
    const _onChangeTextDebounce = useDebouncedCallback((text: String) => {
        if (typeof props.onChangeText == 'function') props?.onChangeText(text)
    }, 500)

    <TextInput
        placeholder='Tìm kiếm chuyên gia'
        placeholderTextColor={'#919EAB'}
        onChangeText={_onChangeTextDebounce}
    />

 */