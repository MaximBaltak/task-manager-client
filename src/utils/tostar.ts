import toastr from "toastr";
toastr.options = {
    positionClass: "toast-bottom-right",
}

export const error = (text: string) => {
    toastr.error(text, 'Ошибка')
}

export const success = (text: string) => {
    toastr.success(text)
}