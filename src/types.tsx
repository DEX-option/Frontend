export type Request = {
    name: string,
    email: string,
    phone: string
}

export type defaultAction = {
    type: string,
    payload: any
}

export type menuItems = {
    name: string,
    link: string,
    subMenu: {
        name: string,
        link: string
    }[]
}[]