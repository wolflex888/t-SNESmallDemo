import numpy as np
from matplotlib import pyplot as plt
import pandas as pd
from sklearn.manifold import TSNE
import time

df = pd.read_csv("/Users/juichanglu/stjude/SmallDemo/data/PBMC12k_Exp_nGene100.txt", delimiter="\t")
# df = pd.read_csv("/Users/juichanglu/stjude/SmallDemo/test.tsv", delimiter="\t")
df_meta = pd.read_csv("/Users/juichanglu/stjude/SmallDemo/data/final.txt", delimiter="\t")
# df = df.fillna(0)
# df.to_csv("test.tsv", sep="\t")
# new_df = pd.merge(df, df_meta, on="ID", how="inner")
k = dict()
for keys in df_meta['CellType'].values:
    k[keys] = 0

print(df)
# print(df_meta['CellType'].values)
# print(k.keys())