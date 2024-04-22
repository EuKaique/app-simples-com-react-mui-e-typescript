import { useNavigate, useParams } from "react-router-dom";

import { LayoutBase } from "../../shared/layouts";
import { DetailTools } from "../../shared/components";
import { useEffect, useState } from "react";
import { VTextField, VForm, useVForm, IFormErrors } from "../../shared/forms";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as Yup from 'yup';
import { CityService } from "../../shared/services/api/city/CityService";

interface IFormData {
    name: string;
}

const formValidationSchema: Yup.Schema<IFormData> = Yup.object().shape({
    name: Yup.string().required().min(3),
});

export const FormContainer = () => {
    const { id = 'form' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (id !== 'form') {

            CityService.getById(Number(id))
            .then((result) => {

                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/cities');
                } else {
                    setName(result.name);
                    formRef.current?.setData(result);
                }
            });
        } else {
            formRef.current?.setData({
                name: ''
            });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {

        formValidationSchema.validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                setIsLoading(true);

                if (id === 'form') {
                    CityService
                        .create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
        
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
        
                                if (isSaveAndClose()) {
                                    alert('Registro inserido com sucesso!');
                                    navigate('/cities');
                                } else {
                                    alert('Registro inserido com sucesso!');
                                    navigate(`/cities/form/${result}`);
                                }
                            }
                        })
                } else {
                    CityService
                        .updateById(Number(id), { id: Number(id), ...dadosValidados})
                        .then((result) => {
                            setIsLoading(false);
        
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    alert('Registro atualizado com sucesso!');
                                    navigate('/cities');
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
            CityService
                .removeById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro excluido com sucesso!');
                        navigate('/cities');
                    }
                })
        }
    };

    return (
        <LayoutBase
            titulo={id === 'form' ? 'Cadastrar cidade' : 'Editar: ' + name}
            barraDeFerramentas={
                <DetailTools 
                    textButtonNew="Nova"
                    showButtonBack
                    showButtonSave
                    showButtonSaveAndClosed
                    showButtonDelete={id !== 'form'}
                    showButtonNew={id !== 'form'}

                    onClickButtonBack={() => navigate('/cities')}
                    onClickButtonSave={save}
                    onClickButtonSaveAndBack={saveAndClose}
                    onClickButtonDelete={() => handleDelete(Number(id))}
                    onClickButtonNew={() => navigate('/cities/form')}
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
                                    label="Nome da cidade" 
                                    name="name" 
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBase>
    )
}