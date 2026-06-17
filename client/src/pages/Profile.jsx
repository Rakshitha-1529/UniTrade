function Profile() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (!user) {
        return <h2>No User Found</h2>;
    }

    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>Profile</h1>

            <p>
                <strong>Name:</strong>
                {" "}
                {user.name}
            </p>

            <p>
                <strong>Email:</strong>
                {" "}
                {user.email}
            </p>

            <p>
                <strong>Department:</strong>
                {" "}
                {user.department}
            </p>

            <p>
                <strong>Year:</strong>
                {" "}
                {user.year}
            </p>

            <p>
                <strong>Semester:</strong>
                {" "}
                {user.semester}
            </p>

        </div>
    );
}

export default Profile;