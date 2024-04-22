import { useNavigate, useParams } from "react-router-dom";

import { LayoutBase } from "../../shared/layouts";
import { DetailTools } from "../../shared/components";
import { useEffect, useState } from "react";
import { PersonService } from "../../shared/services/api/person/PersonService";
import { VTextField, VForm, useVForm, IFormErrors } from "../../shared/forms";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as Yup from 'yup';
import { AutoCompleteCity } from "./components/AutoCompleteCitie";

interface IFormData {
    fullname: string;
    email: string;
    cityId: number;
}

const formValidationSchema: Yup.Schema<IFormData> = Yup.object().shape({
    fullname: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    cityId: Yup.number().required()
});

export const FormContainer = () => {
    const { id = 'form' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (id !== 'form') {

            PersonService.getById(Number(id))
            .then((result) => {

                
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/persons');
                } else {
                    const cityId = Number(result.cityId);

                    setName(result.fullname);
                    formRef.current?.setData({
                        fullname: result.fullname,
                        email: result.email,
                        cityId: cityId
                    });
                }
            });
        } else {
            formRef.current?.setData({
                fullname: '',
                email: '',
                cityId: undefined
            });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {

        formValidationSchema.validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true);

                if (id === 'form') {
                    PersonService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
        
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
        
                                if (isSaveAndClose()) {
                                    alert('Registro inserido com sucesso!');
                                    navigate('/persons');
                                } else {
                                    alert('Registro inserido com sucesso!');
                                    navigate(`/persons/form/${result}`);
                                }
                            }
                        })
                } else {
                    PersonService
                        .updateById(Number(id), { id: Number(id), ...dadosValidados})
                        .then((result) => {
                            setIsLoading(false);
        
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    alert('Registro atualizado com sucesso!');
                                    navigate('/persons');
                                }
                            }
                        })
                }
            }).catch((errors: Yup.ValidationError) => {
                const validationErrors: IFormErrors = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;
                    validationErrors[error.path] = error.message;
                });

                formRef.current?.setErrors(validationErrors);
            })
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            PersonService
                .removeById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro excluido com sucesso!');
                        navigate('/persons');
                    }
                })
        }
    };

    return (
        <LayoutBase
            titulo={id === 'form' ? 'Cadastrar pessoa' : 'Editar: ' + name}
            barraDeFerramentas={
                <DetailTools 
                    textButtonNew="Nova"
                    showButtonBack
                    showButtonSave
                    showButtonSaveAndClosed
                    showButtonDelete={id !== 'form'}
                    showButtonNew={id !== 'form'}

                    onClickButtonBack={() => navigate('/persons')}
                    onClickButtonSave={save}
                    onClickButtonSaveAndBack={saveAndClose}
                    onClickButtonDelete={() => handleDelete(Number(id))}
                    onClickButtonNew={() => navigate('/persons/form')}
                />
            }
        >

            <VForm ref={formRef} onSubmit={handleSave} placeholder={name}>
                <Box margin={1} display="flex" flexDirection="column" gap={2} component={Paper} variant="outlined">
                    {isLoading && (
                        <Grid item sx={{ padding: '1rem 1rem 0'}}>
                            <LinearProgress variant="indeterminate" />
                        </Grid>
                    )}

                    <Grid item paddingLeft={2} paddingTop={2}>
                        <Typography variant="h6">Informações</Typography>
                    </Grid>

                    <Grid container direction="column" padding={2} spacing={2}>
                        <Grid container item direction="row">
                            <Grid item xs={12} md={6} lg={4} xl={2}> 
                                <VTextField 
                                    fullWidth 
                                    label="Nome completo" 
                                    name="fullname" 
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row">
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField 
                                    fullWidth 
                                    label="E-mail" 
                                    name="email" 
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row">
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <AutoCompleteCity isExternalLoading={isLoading}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBase>
    )
}