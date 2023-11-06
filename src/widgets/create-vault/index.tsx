"use client"

import React, {useState} from 'react';
import {Button, Checkbox, FormLabel, Input, Modal, ModalClose, Sheet, Textarea, Typography} from "@mui/joy";
import Add from "@mui/icons-material/Add";
import {getRandom} from "@/features/get-random";
import {vaultNames} from "@/shared/data/vault-names";
import {SubmitHandler, useForm} from "react-hook-form";
import {Model} from "@/widgets/create-vault/model";

const CreateVault = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Model>()
    const onSubmit: SubmitHandler<Model> = (data) => {
        console.log(data)
        setLoading(true)

        function throwErrorAfterDelay() {
            setTimeout(() => {
                throw new Error("Ошибка после задержки в 300 миллисекунд");
            }, 300);
        }

        try {
            throwErrorAfterDelay();
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    return (
        <>
            <Button startDecorator={<Add/>} onClick={() => setOpen(true)} variant="solid">Создать новый волт</Button>
            <Modal sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} open={open}
                   onClose={() => setOpen(false)}>
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{m: 1}}/>
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Создание волта
                    </Typography>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                        <FormLabel>
                            <Typography id="modal-desc" textColor="inherit" sx={{color: "white"}}>
                                Название
                                <Input error={watch("name")?.length > 100} aria-valuemax={100}
                                       placeholder={getRandom(vaultNames)}
                                       sx={{width: 300}} {...register("name", {required: true, maxLength: 100})}
                                       endDecorator={100 - watch("name")?.length || 100}/>
                            </Typography>
                        </FormLabel>
                        <FormLabel>
                            <Typography id="modal-desc" textColor="inherit" sx={{color: "white"}}>
                                Описание
                                <Textarea error={watch("description")?.length > 1000} aria-valuemax={1000} minRows={3}
                                          maxRows={3} sx={{width: 300}}
                                          endDecorator={1000 - watch("description")?.length || 1000}
                                          placeholder={getRandom(vaultNames)} {...register("description", {
                                    required: true,
                                    maxLength: 1000
                                })}/>
                            </Typography>
                        </FormLabel>
                        <Checkbox label="Приватный волт" {...register("isPrivate", {required: true})} variant="solid"
                                  defaultChecked/>
                        {/*<Button error={error} type="submit" loading={loading}>Создать волт</Button>*/}
                    </form>
                </Sheet>
            </Modal>
        </>
    );
};

export default CreateVault;