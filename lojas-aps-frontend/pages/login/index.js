import Link from "next/link";
import styles from "../../styles/login.module.css";
export default function Login() {
  return (
    <div className={styles.login_box}>
      <h2>Login</h2>
      <form>
        <div className={styles.user_box}>
          <input type="email" name="" required="" />
          <label>Email</label>
        </div>
        <div className={styles.user_box}>
          <input type="password" name="" required="" />
          <label>Password</label>
        </div>
        <div className={styles.botoes}> 
          <Link href={"#"}>Submit</Link>
          <Link href={"/signup"}>Sign up</Link>
        </div>
       
      </form>
    </div>
  );
}
