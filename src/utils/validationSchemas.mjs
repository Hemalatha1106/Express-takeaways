export const CreateUserValidationSchema = {
    user_name:{
        notEmpty:{
            errorMessage: "user name must not be empty"
        },
        isLength:{
            options: {min: 3, max: 12},
            errorMessage: "user name length should be between 3 and 12"
        }
    },
    age:{
        notEmpty:{
            errorMessage: "User age should not be empty"
        }
    }
}