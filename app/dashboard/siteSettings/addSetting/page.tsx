'use client'

import { RegisterUserFormSchema, TRegisterUserFormSchema } from '@/ZSchemas'
import { register } from '@/actions/register'
import { zodResolver } from '@hookform/resolvers/zod'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    styled
} from '@mui/material'
import Fab from '@mui/material/Fab'
import Link from 'next/link'
import queryString from 'query-string'
import React, { startTransition, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Switch from '@mui/material/Switch'
import {
    VariantType,
    enqueueSnackbar
} from 'notistack'

type Props = {
    params: {},
    // searchParams: string
    searchParams: { [key: string]: string | undefined }
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 50,
    height: 25,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 22,
        height: 22,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

function AddSettings({ searchParams }: Props) {

    const [isPending, startTransition] = useTransition()

    const {
        cat,
        path,
        parent
    } = searchParams

    const stringified = queryString.stringify(searchParams)

    let cancel = path || ''

    if (cat && cat !== '') cancel = `${parent}/${cat}`

    if (!cat && parent !== '') cancel = parent || ''

    const handleClickVariant = (variant: VariantType, meg: string) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(meg, { variant })
    }

    const form = useForm<TRegisterUserFormSchema>({
        resolver: zodResolver(RegisterUserFormSchema),
        defaultValues: {
            phone: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = (values: TRegisterUserFormSchema) => {

        startTransition(() => {
            register(values)
                .then((data) => {
                    data.success ? handleClickVariant('success', data.msg) : handleClickVariant('error', data.msg)
                    // router.push('/username')
                    // router.refresh()
                })

        })
    }

    return (
        <Box
            component="div"
            sx={{ m: '2px', width: '100%', justifyContent: 'center' }}
        >
            <Fab
                size="medium"
                variant="extended"
                color="secondary"
                aria-label="add"
            >
                <Link
                    href={`/dashboard/siteSettings/${cancel}`}
                >
                    انصراف
                </Link>
            </Fab>

            <Box
                component={'div'}
                sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gap: 2,
                    width: '100%'
                }}
            >

                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                                <InputLabel htmlFor="confirmPassword">نام دسته بندی</InputLabel>
                                <OutlinedInput
                                    id='phone'
                                    // inputComponent={TextMaskCustom as any}
                                    {...field}
                                    autoComplete='tel-national'
                                    // disabled={isPending}
                                    // onInvalid={true}
                                    error={fieldState.error ? true : false}
                                    type={'text'}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                // onClick={handleClickShowPassword}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="start"
                                            >
                                                {/* {<SendToMobileRoundedIcon />} */}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="نام دسته بندی"
                                    fullWidth
                                />
                                {/* <Input
                                value={values.textmask}
                                onChange={handleChange}
                                name="textmask"
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustom as any}
                            /> */}
                                <FormHelperText
                                    component={'div'}
                                    sx={{
                                        color: 'error.main',
                                    }}
                                >
                                    {fieldState.error?.message ?? ''}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormControl
                                component="div"
                                fullWidth
                                sx={{ my: 1 }}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="email">نام لاتین دسته بندی</InputLabel>
                                <OutlinedInput
                                    id='email'
                                    {...field}
                                    autoComplete='email'
                                    // disabled={isPending}
                                    error={fieldState.error ? true : false}
                                    type={'text'}
                                    label="نام لاتین دسته بندی"
                                    fullWidth
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="start"
                                            >
                                                {/* {<EmailRoundedIcon />} */}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText
                                    component={'div'}
                                    sx={{
                                        color: 'error.main',
                                    }}
                                >
                                    {fieldState.error?.message ?? ''}
                                </FormHelperText>
                            </FormControl>

                        )}
                    />
                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormControl
                                component="div"
                                fullWidth
                                sx={{ my: 1 }}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="username">آلبوم</InputLabel>
                                <OutlinedInput
                                    id='username'
                                    {...field}
                                    autoComplete='username'
                                    // disabled={isPending}
                                    error={fieldState.error ? true : false}
                                    type={'text'}
                                    label="آلبوم"
                                    fullWidth
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="start"
                                            >
                                                {/* {<PersonRoundedIcon />} */}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText
                                    component={'div'}
                                    sx={{
                                        color: 'error.main',
                                    }}
                                >
                                    {fieldState.error?.message ?? ''}
                                </FormHelperText>
                            </FormControl>

                        )}
                    />

                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                                <InputLabel htmlFor="password">آیکون</InputLabel>
                                <OutlinedInput
                                    id='password'
                                    {...field}
                                    autoComplete='off'
                                    // disabled={isPending}
                                    error={fieldState.error ? true : false}
                                    // type={showPassword ? 'text' : 'password'}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                // onClick={handleClickShowPassword}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="start"
                                            >
                                                {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="آیکون"
                                    fullWidth
                                />
                                <FormHelperText
                                    component={'div'}
                                    sx={{
                                        color: 'error.main',
                                    }}
                                >
                                    {fieldState.error?.message ?? ''}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="confirmPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormControl component="div" fullWidth sx={{ my: 1 }} variant="outlined">
                                <InputLabel htmlFor="confirmPassword">آیکون رنگی</InputLabel>
                                <OutlinedInput
                                    id='confirmPassword'
                                    {...field}
                                    autoComplete='off'
                                    // disabled={isPending}
                                    error={fieldState.error ? true : false}
                                    // type={showPassword ? 'text' : 'password'}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                // onClick={handleClickShowPassword}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="start"
                                            >
                                                {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="آیکون رنگی"
                                    fullWidth
                                />
                                <FormHelperText
                                    component={'div'}
                                    sx={{
                                        color: 'error.main',
                                    }}
                                >
                                    {fieldState.error?.message ?? ''}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <FormControlLabel
                        label="Label"
                        labelPlacement='start'
                        control={
                            <Switch
                                {...{ inputProps: { 'aria-label': 'Switch demo' } }}
                                color="info"
                            />
                        }
                    />

                    <FormControlLabel
                        labelPlacement='start'
                        control={
                            <MaterialUISwitch
                                sx={{ m: 1 }}
                                defaultChecked
                            />
                        }
                        label="تم"
                    />

                    <Button
                        type='submit'
                        disabled={isPending}
                        variant='contained'
                        color='info'
                        sx={{ width: '100%' }}
                    >
                        ورود
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default AddSettings