export interface SuccessLoginResponse {
    status: string;
    token: string;
    data: {
        user: UserResponse;
    };
}

export interface FailedLoginResponse {
    message: string;
    statusMsg: string;
}

export interface UserResponse {
    _id: string;
    name: string;
    email: string;
    role: string;
    profilePic: {
        url: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}