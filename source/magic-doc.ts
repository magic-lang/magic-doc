import { BufferedReader } from "./io/BufferedReader";
import { FileReader } from "./io/FileReader";
import { Lexer } from "./frontend/Lexer";

var lexer = new Lexer(new BufferedReader(new FileReader("test/ooc/class.ooc")));

while (lexer.hasNext()) {
    console.log(lexer.getNext());
}
