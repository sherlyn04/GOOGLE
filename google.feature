Feature: Google Search

  Scenario: Buscar un término y verificar resultados
    Given que estoy en la página principal de Google
    When busco "Cucumber BDD"
    Then debería ver resultados relacionados con "Cucumber"
