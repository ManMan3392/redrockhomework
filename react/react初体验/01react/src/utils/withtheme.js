import themecontext from "./themecontext";
export function withtheme(OriginComponent) {
    return (props) => {
        return (
            <themecontext.Consumer>
                {
                    value => {
                        return <OriginComponent {...props} {...value}></OriginComponent>
                    }
                }
            </themecontext.Consumer>
        )
    }
}