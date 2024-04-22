import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { CityService } from "../../../shared/services/api/city/CityService";
import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";

type TAutoCompleteOptions = {
    id: number;
    label: string;
}

interface IAutoCompleteCityProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCity = ({ isExternalLoading }: IAutoCompleteCityProps) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField('cityId');
    const { debounce } = useDebounce();
    
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

    const [options, setOptions] = useState<TAutoCompleteOptions[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newValue) => setSelectedId(newValue)
        });
    }, [registerField, fieldName, selectedId]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            CityService
                .getAll(1, '')
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setOptions(result.data.map(city => {
                            return {
                                id: city.id,
                                label: city.name
                            }
                        }));
                    }
                });
        });
    }, [debounce, search]);

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return undefined;

        const selectedOption = options.find(option => option.id === selectedId);
        
        return selectedOption ?? undefined;

    }, [selectedId, options]);

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Nenhuma opção"
            loadingText="Carregando..." 
            disablePortal
            options={options}
            loading={isLoading}
            disabled={isExternalLoading}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress color="inherit" size={20}/> : undefined}
            value={autoCompleteSelectedOption}
            onChange={(_, newValue) => {
                setSelectedId(newValue?.id);
                setSearch('');
            }}
            onInputChange={(_, newInputValue) => {
                setSearch(newInputValue);
            }}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="Cidade" 
                    error={!!error}
                    helperText={error}
                    onFocus={() => clearError()}
                />
            )}
        />
    );
}