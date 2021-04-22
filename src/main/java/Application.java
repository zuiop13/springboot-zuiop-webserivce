import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Application {
    //psvm
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/springdata";
        String username = "zuiop13";
        String password = "pass";

        try(Connection connection = DriverManager.getConnection(url,username,password)) {
            System.out.println("====================================");
            System.out.println("Test connection created "+connection);

            //create
            //String sql = "create table account (id int,username varchar(255),password varchar(255));";

            //insert 현재 테스트 중입니다.
            String sql = "insert into account VALUES(1,'zuiop13','pass');";

            try(PreparedStatement statement = connection.prepareStatement(sql)){
                statement.execute();
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
