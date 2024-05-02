import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHome, faLock, faTag } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/Sidebar.module.css";
import { showToast } from "../../../utils/Toast";
import { useState } from "react";
import DeleteAllModal from "./DeleteAllModal";
import { useRouter } from "next/router";

const Sidebar = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const router = useRouter()

    const hideDeleteModal = () => setShowDeleteModal(false);

    const handleDeleteAll = async () => {
        const response = await fetch('/api/deleteAll', {
            method: "DELETE"
        })
        const data = await response.json()

        setShowDeleteModal(false)
        if (response.status === 200) {
            showToast(data.message, "success")
            router.reload()
        } else {
            showToast(data.message, "error")
        }
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebar_logo}>
                <img src="/images/logo/logo2.png" alt="" />
                <h3>آرش الطافی</h3>
            </div>
            <ul className={styles.sidebar_links}>
                <li>
                    <a className={styles.active || styles.sidebar_link}>
                        <span>
                            <FontAwesomeIcon icon={faHome} />
                        </span>
                        صفحه اصلی
                    </a>
                </li>
                <li>
                    <a className={styles.sidebar_links}>
                        <span>
                            <FontAwesomeIcon icon={faTag} />
                        </span>
                        تماس با ما
                    </a>
                </li>
                <li>
                    <a className={styles.sidebar_links}>
                        <span>
                            <FontAwesomeIcon icon={faBookmark} />
                        </span>
                        درباره ما
                    </a>
                </li>
            </ul>
            <div className={styles.sidebar_logout}>
                <a onClick={() => setShowDeleteModal(true)} className={styles.logout}>
                    <span>
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    حذف همه
                </a>
            </div>

            {showDeleteModal &&
                <DeleteAllModal hideDeleteModal={hideDeleteModal} deleteAllCourse={handleDeleteAll} />
            }
        </aside>
    )
}

export default Sidebar
