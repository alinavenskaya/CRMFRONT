export const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%"
    },
    wrapper: {
        position: "fixed",
        height: "100%",
        width: "100%"
    },
    welcome: {},
    section: {
        height: "100vh",
        width: "100%",
        backgroundColor: theme.palette.secondary.light
    },
    navbar: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100px",
        paddingLeft: 100,
        paddingRight: 100,
        backgroundColor: theme.palette.secondary.light
    },
    logo: {
        justifySelf: "start"
    },
    list: {
        display: "flex",
        listStyle: "none"
    },
    links: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "center"
    },
    link: {
        marginRight: "80px",
        textDecoration: "none",
        fontSize: "1.3rem",
        textTransform: "capitalize",
        borderRadius: 50,
        color: theme.palette.primary.main
    },
    textblock: {},
    logotext: {
        width: 200
    },
    contetWelcome: {
        height: "calc(100% - 100px)",
        paddingLeft: 100,
        paddingRight: 100
    },
    content: {
        height: "100vh",
        paddingLeft: 100,
        paddingRight: 100
    },
    imgblock: {},
    container: {
        width: "100%",
        margin: 0,
        height: "100%",
        paddingLeft: 100,
        paddingRight: 100
    },
    contentContainer: {
        width: "100%",
        margin: 0,
        height: "100vh",
        paddingLeft: 100,
        paddingRight: 100
    },
    contentContainerSecondary: {
        width: "100%",
        margin: 0,
        height: "100vh",
        backgroundColor: theme.palette.secondary.light,
        paddingLeft: 100,
        paddingRight: 100
    },
    button: {
        borderRadius: "50px"
    },
    pageButton: {
        borderRadius: "50px",
        marginTop: 30
    },
    h2: {
        fontWeight: "bold",
        fontSize: "3rem"
    },
    h3: {
        fontWeight: "normal",
        fontSize: "2.4rem"
        // marginBottom: 30
    },
    highlight: {
        color: theme.palette.primary.main
    }
});