import Html,{ html }from "@elysiajs/html";
import Layout from "../layout/layout";

export default function Home({ title }: any) {
  return (
    <div>
        <h1>{title}</h1>
        <table>
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="/counter">
                  Counter GUI
                </a>
              </td>
              <td>Demonstrates inline editing of a data objectCounter 
                serves as a gentle introduction to the basics of the 
                language, paradigm and toolkit for one of the simplest 
                GUI applications imaginable.</td>
            </tr>
          </tbody>
        </table>
    </div>
  );
}