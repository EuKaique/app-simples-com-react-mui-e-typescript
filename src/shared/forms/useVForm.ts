import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

export const useVForm = () => {
    const formRef = useRef<FormHandles>(null);

    const isSaveAndNew = useRef(false);
    const isSaveAndClose = useRef(false);

    const handleSave = useCallback(() => {

        isSaveAndNew.current = false;
        isSaveAndClose.current = false;
        formRef.current?.submitForm();

    }, []);

    const handleSaveAndNew = useCallback(() => {

        isSaveAndNew.current = true;
        isSaveAndClose.current = true;
        formRef.current?.submitForm();

    }, []);

    const handleSaveAndClose = useCallback(() => {
        isSaveAndClose.current = true;
        isSaveAndNew.current = false;
        formRef.current?.submitForm();
    }, []);


    const handleIsSaveAndNew = useCallback(() => {
        return isSaveAndNew.current;
    }, []);
    const handleIsSaveAndClose = useCallback(() => {
        return isSaveAndClose.current;
    }, []);

    return { 
        formRef,
        save: handleSave,
        saveAndNew: handleSaveAndNew,
        saveAndClose: handleSaveAndClose,
        isSaveAndNew: handleIsSaveAndNew,
        isSaveAndClose: handleIsSaveAndClose
    };
}