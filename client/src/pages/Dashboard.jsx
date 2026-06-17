import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import "../styles/dashboard.css";
function Dashboard() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const resources =
        JSON.parse(
            localStorage.getItem("resources")
        ) || [];
    const {
    searchTerm,
    filter
} = useContext(SearchContext);

const filteredResources =
    resources.filter((resource) => {

        const matchesSearch =
            resource.title
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                );

        const matchesFilter =
            filter === "All" ||
            resource.category === filter;

        return (
            matchesSearch &&
            matchesFilter
        );
    });
    return (

        <div className="dashboard">

            <h1>
                Welcome, {user?.name} 👋
            </h1>

            {/* Stats */}

         <div className="stats-container">

    <div className="stat-card">

        <h2>
            {resources.length}
        </h2>

        <p>
            Resources
        </p>

    </div>

    <div className="stat-card">

        <h2>
            {
                resources.filter(
                    r =>
                    r.category === "Book"
                ).length
            }
        </h2>

        <p>
            Books
        </p>

    </div>

    <div className="stat-card">

        <h2>
            {
                resources.filter(
                    r =>
                    r.category === "Notes"
                ).length
            }
        </h2>

        <p>
            Notes
        </p>

    </div>

    <div className="stat-card">

        <h2>
            0
        </h2>

        <p>
            Notifications
        </p>

    </div>

</div>
            {/* Resources */}

            <h2>
                Recently Uploaded Resources
            </h2>

            {resources.length === 0 ? (

                <p>
                    No resources uploaded yet.
                </p>

            ) : (

                <div className="resource-grid">

                    {filteredResources.map((resource) => (

                        <div
                            key={resource.id}
                            className="resource-card"
                        >

                            <h3>
                                {resource.title}
                            </h3>

                            <p>
                                <strong>Subject:</strong>{" "}
                                {resource.subject}
                            </p>

                            <p>
                                <strong>Category:</strong>{" "}
                                {resource.category}
                            </p>

                            <p>
                                <strong>Uploaded By:</strong>{" "}
                                {resource.uploadedBy}
                            </p>

                            {/* Image Preview */}

                            {resource.fileType?.startsWith("image") ? (

                                <img
                                    src={resource.fileData}
                                    alt={resource.title}
                                    style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                        marginTop: "10px"
                                    }}
                                />

                            ) : (

                                <div
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px"
                                    }}
                                >
                                    📄 PDF Document
                                </div>

                            )}

                            <a
                                href={resource.fileData}
                                download={resource.fileName}
                            >
                                <button>
                                    Download
                                </button>
                            </a>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Dashboard;