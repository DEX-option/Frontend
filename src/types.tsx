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


export type infoScheme = {
    heading: string,
    description: string,
    image: string,
    imagePosition: "left" | "right"
}

export type infoContent = {
    title: string,
    description: string,
    timeline: boolean,
    content: infoScheme[]
}