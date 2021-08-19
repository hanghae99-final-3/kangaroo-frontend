import React from "react";
import { Formik, Form } from "formik";
import SocialLogin from "./SocialLogin";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import { makeStyles } from "@material-ui/styles";
import { LoginTextField } from "./LoginTextField";
import {
    Grid,
    Typography,
    Button,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles({
    mainContainer: {
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    titleContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "30px",
    },
    formContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    inputContainer: {
        width: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
});

const LoginPresenter = ({
    validate,
    toggleLoginMode,
    onLoginSubmit,
    socialLoginMode,
    isRememberEmailChecked,
    handleCheckBox,
}) => {
    const classes = useStyles();
    return (
        <Grid item className={classes.mainContainer} xs={12}>
            <Grid className={classes.titleContainer}>
                <LoginText variant="h4">로그인</LoginText>
            </Grid>
            {socialLoginMode ? (
                <SocialLogin toggleLoginMode={toggleLoginMode} />
            ) : (
                <Grid className={classes.formContainer}>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={validate}
                        onSubmit={({ email, password }) =>
                            onLoginSubmit(email, password)
                        }
                    >
                        {formik => (
                            <Grid className={classes.formContainer}>
                                <Form className={classes.inputContainer}>
                                    <LoginTextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                    />
                                    <LoginTextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                    />
                                    <AutoLogin>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        isRememberEmailChecked
                                                    }
                                                    onChange={handleCheckBox}
                                                    name="rememberEmail"
                                                    color="primary"
                                                />
                                            }
                                            label="아이디 저장"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="autoLogin"
                                                    color="primary"
                                                />
                                            }
                                            label="자동 로그인"
                                        />
                                    </AutoLogin>

                                    <Button
                                        style={{
                                            marginTop: "20px",
                                            width: "320px",
                                            height: "40px",
                                            borderRadius: "10px",
                                        }}
                                        type="submit"
                                        variant="outlined"
                                    >
                                        로그인
                                    </Button>
                                    <Button
                                        style={{
                                            marginTop: "20px",
                                            width: "320px",
                                            height: "40px",
                                            borderRadius: "10px",
                                        }}
                                        variant="outlined"
                                        onClick={toggleLoginMode}
                                    >
                                        소셜 로그인
                                    </Button>
                                </Form>
                            </Grid>
                        )}
                    </Formik>
                </Grid>
            )}{" "}
        </Grid>
    );
};

const LoginText = styled.div`
    ${mixin.textProps(40, "extraBold", "black")}
`;
const AutoLogin = styled.div``;

export default LoginPresenter;
