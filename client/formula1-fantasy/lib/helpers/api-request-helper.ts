export const createNewUser = async (idToken: string, name: string, email: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/formula1/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
            name: `${name}`.trim(),
            email,
        }),
    });
};