import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/Navbar.module.css";
import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";
import { showToast } from "../../../utils/Toast";

const Navbar = () => {
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = () => {
    if (!search || search == '' || search.trim() == '') {
      showToast('لطفا دوره ی مد نظر خود را بنویسید', "error")
      router.push('')
      setTimeout(() => {
        router.reload()
      }, 500);
    } else {
      router.push(`/?title=${search.trim()}`)
      setTimeout(() => {
        router.reload()
      }, 200);
    }

    setSearch('')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_search}>
        <input
          type="text"
          placeholder="جستجو کنید...."
          value={search}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span onClick={handleSearch} className={styles.navbar_search_icon}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <div className={styles.navbar_user_avatar}>
        <img src="/images/avatar/avatar.png" alt="" />
      </div>
    </nav>
  )
}

export default Navbar
