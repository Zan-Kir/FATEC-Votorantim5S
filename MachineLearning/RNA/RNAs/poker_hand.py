import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.metrics import accuracy_score, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
from ucimlrepo import fetch_ucirepo
 
def preprocess_data(X, y):
    """Prepara os dados para o treinamento da rede neural."""
    print("Iniciando pré-processamento...")
 
    categorical_features = ['S1', 'S2', 'S3', 'S4', 'S5']
    numerical_features = ['C1', 'C2', 'C3', 'C4', 'C5']
 
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(), categorical_features)
        ],
        remainder='passthrough'
    )
 
    X_processed = preprocessor.fit_transform(X)
 
    y_encoder = OneHotEncoder(sparse_output=False)
    y_processed = y_encoder.fit_transform(y)
 
    print("Pré-processamento concluído.")
    print(f"Shape de X após processamento: {X_processed.shape}")
    print(f"Shape de y após processamento: {y_processed.shape}")
    print("-" * 50)
   
    return X_processed, y_processed

def create_model(input_shape, output_units, hidden_layers_config):
    """Cria um modelo de rede neural sequencial com a arquitetura especificada."""
    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.InputLayer(input_shape=input_shape))
   
    for neurons in hidden_layers_config:
        model.add(tf.keras.layers.Dense(neurons, activation='relu'))
       
    model.add(tf.keras.layers.Dense(output_units, activation='softmax'))
   
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model
 
def train_and_evaluate():
    """Função principal que orquestra o fluxo de trabalho."""
    print("Buscando dataset do repositório UCI...")
    try:
        poker_hand = fetch_ucirepo(id=158)
    except Exception as e:
        print(f"Erro ao buscar os dados. Verifique a instalação da 'ucimlrepo' e sua conexão. Erro: {e}")
        return
 
    X = poker_hand.data.features
    y = poker_hand.data.targets
   
    print("Dados carregados com sucesso!")
    print(f"Total de amostras: {len(X)}")
    print("Primeiras 5 linhas das features (X):")
    print(X.head())
    print("-" * 50)
 
    X_processed, y_processed = preprocess_data(X, y)
 
    X_train, X_test, y_train, y_test = train_test_split(
        X_processed, y_processed, test_size=0.2, random_state=42, stratify=y_processed
    )
    print("Dados divididos em conjuntos de treino e teste.")
    print(f"Tamanho do treino: {X_train.shape[0]} amostras")
    print(f"Tamanho do teste: {X_test.shape[0]} amostras")
    print("-" * 50)
 
    architectures = {
        "1_camada_20_neurônios": (20,),
        "1_camada_50_neurônios": (50,),
        "1_camada_100_neurônios": (100,),
        "2_camadas_20_20": (20, 20),
        "2_camadas_50_20": (50, 20),
        "2_camadas_100_20": (100, 20),
        "2_camadas_100_50": (100, 50),
    }
 
    input_shape = (X_train.shape[1],)
    output_units = y_train.shape[1]
 
    for name, config in architectures.items():
        print(f"\n--- TREINANDO MODELO: {name} ---")
       
        model = create_model(input_shape, output_units, config)
        model.summary()
       
        model.fit(
            X_train,
            y_train,
            epochs=10,
            batch_size=256,
            validation_split=0.1,
            verbose=1
        )
       
        print(f"\n--- AVALIANDO MODELO: {name} ---")
       
        y_pred_proba = model.predict(X_test)
        y_pred_labels = np.argmax(y_pred_proba, axis=1)
        y_test_labels = np.argmax(y_test, axis=1)
       
        accuracy = accuracy_score(y_test_labels, y_pred_labels)
        print(f"Acurácia no conjunto de teste: {accuracy:.4f}")
       
        cm = confusion_matrix(y_test_labels, y_pred_labels)
        print("Matriz de Confusão:")
        print(cm)
       
        plt.figure(figsize=(10, 8))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
        plt.title(f'Matriz de Confusão - {name}\nAcurácia: {accuracy:.4f}')
        plt.ylabel('Classe Verdadeira')
        plt.xlabel('Classe Predita')
        plt.show()
 
if __name__ == '__main__':
    tf.random.set_seed(42)
    np.random.seed(42)
   
    train_and_evaluate()
 