import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/Navbar.module.css";
import { KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { showToast } from "../../../utils/Toast";
import Image from "next/image";

const Navbar = () => {
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (router.query && router.query.title && typeof (router.query.title) == "string" && router.query.title != '') {
      setSearch(router.query.title)
    }
  }, [])

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
        <Image
          src="https://arashaltafi.ir/arash.jpg"
          alt="ArashAltafi"
          width={100}
          height={100}
          quality="10"
          loading='eager'
        />
      </div>
    </nav>
  )
}

export default Navbar
