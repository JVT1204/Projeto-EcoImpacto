import model.User;
import repository.UserRepository;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        UserRepository userRepository = new UserRepository();

        // Criar um novo usuário
        User newUser = new User(null, "Ana", "ana@example.com", "child");
        userRepository.createUser(newUser);
        System.out.println("Usuário criado: " + newUser);

        // Obter todos os usuários
        List<User> users = userRepository.getAllUsers();
        System.out.println("Todos os usuários:");
        for (User user : users) {
            System.out.println(user);
        }

        // Obter usuário por ID
        User user = userRepository.getUserById(newUser.getId());
        System.out.println("Usuário encontrado: " + user);

        // Atualizar usuário
        user.setName("Ana Maria");
        userRepository.updateUser(user);
        System.out.println("Usuário atualizado: " + user);

        // Deletar usuário
        userRepository.deleteUser(user.getId());
        System.out.println("Usuário deletado.");
    }
}
