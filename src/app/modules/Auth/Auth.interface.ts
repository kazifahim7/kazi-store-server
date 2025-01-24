export type TCreateUser = {
    name: string,
    email: string,
    password: string,
    role: "admin" | "user",
    isBlocked: "active" | "block",
    address?:string
 

}