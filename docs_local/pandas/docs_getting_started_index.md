# Getting started — pandas 3.0.1 documentation

Source: https://pandas.pydata.org/docs/getting_started/index.html

## Page Heading
Getting started #

## Sections
- Getting started #
- Installation #
- Intro to pandas #
- Coming from… #
- Tutorials #

## Content
Getting started 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 Getting started # 

 
 Installation # 

 
 
 
 
 
 
Working with conda? 
 pandas can be installed via conda from conda-forge .

 
 
 conda install -c conda-forge pandas
 
 
 
 
 
 
 
 
 
Prefer pip? 
 pandas can be installed via pip from PyPI .

 
 
 pip install pandas
 
 
 
 
 
 
 
 
 
In-depth instructions? 
 Installing a specific version? Installing from source? Check the advanced
installation page.

 
 
 Learn more 

 
 
 
 
 
 
 
 Intro to pandas # 

 
 

 
 
 
 
 
 What kind of data does pandas handle?
 
 Straight to tutorial… 

 
 
 
 
 When working with tabular data, such as data stored in spreadsheets or databases, pandas is the right tool for you. pandas will help you
to explore, clean, and process your data. In pandas, a data table is called a DataFrame .

 
 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 

 
 
 
 
 
 How do I read and write tabular data?
 
 Straight to tutorial… 

 
 
 
 
 pandas supports the integration with many file formats or data sources out of the box (csv, excel, sql, json, parquet,…). The ability to import data from each of these
data sources is provided by functions with the prefix, read_* . Similarly, the to_* methods are used to store data.

 
 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 

 
 
 
 
 
 How do I select a subset of a table?
 
 Straight to tutorial… 

 
 
 
 
 Selecting or filtering specific rows and/or columns? Filtering the data on a particular condition? Methods for slicing, selecting, and extracting the
data you need are available in pandas.

 
 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 

 
 
 
 
 
 How to create plots in pandas?
 
 Straight to tutorial… 

 
 
 
 
 pandas provides plotting for your data right out of the box with the power of Matplotlib. Simply pick the plot type (scatter, bar, boxplot,…)
corresponding to your data.

 
 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 

 
 
 
 
 
 How to create new columns derived from existing columns?
 
 Straight to tutorial… 

 
 
 
 
 There’s no need to loop over all rows of your data table to do calculations. Column data manipulations work elementwise in pandas.
Adding a column to a DataFrame based on existing data in other columns is straightforward.

 
 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 

 
 
 
 
 
 How to calculate summary statistics?
 
 Straight to tutorial… 

 
 
 
 
 Basic statistics (mean, median, min, max, counts…) are easily calculable across data frames. These, or even custom aggregations, can be applied on the entire
data set, a sliding window of the data, or grouped by categories. The latter is also known as the split-apply-combine approach.

 
 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 

 
 
 
 
 
 How to reshape the layout of tables?
 
 Straight to tutorial… 

 
 
 
 
 
 Change the structure of your data table in a variety of ways. You can use melt() to reshape your data from a wide format to a long and tidy one. Use pivot() to go from long to wide format. With aggregations built-in, a pivot table can be created with a single command.

 
 
 
 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 

 
 
 
 
 
 How to combine data from multiple tables?
 
 Straight to tutorial… 

 
 
 
 
 Multiple tables can be concatenated column wise or row wise with pandas’ database-like join and merge operations.

 
 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 

 
 
 
 
 
 How to handle time series data?
 
 Straight to tutorial… 

 
 
 
 
 pandas has great support for time series and has an extensive set of tools for working with dates, times, and time-indexed data.

 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 

 
 
 
 
 
 How to manipulate textual data?
 
 Straight to tutorial… 

 
 
 
 
 Data sets often contain more than just numerical data. pandas provides a wide range of functions to clean textual data and extract useful information from it.

 
 To introduction tutorial 

 
 To user guide 

 
 
 
 
 
 
 
 
 Coming from… # 

 Are you familiar with other software for manipulating tabular data? Learn
the pandas-equivalent operations compared to software you already know:

 
 
 
 
 
 
 The R programming language provides a
 data.frame data structure as well as packages like
 tidyverse which use and extend data.frame 
for convenient data handling functionalities similar to pandas.

 
 
 Learn more 

 
 
 
 
 
 
 
 Already familiar with SELECT , GROUP BY , JOIN , etc.?
Many SQL manipulations have equivalents in pandas.

 
 
 Learn more 

 
 
 
 
 
 
 
 The data set included in the STATA 
statistical software suite corresponds to the pandas DataFrame .
Many of the operations known from STATA have an equivalent in pandas.

 
 
 Learn more 

 
 
 
 
 
 
 
 Users of Excel 
or other spreadsheet programs will find that many of the concepts are
transferable to pandas.

 
 
 Learn more 

 
 
 
 
 
 
 
 SAS , the statistical software suite,
uses the data set structure, which closely corresponds pandas’ DataFrame .
Also SAS vectorized operations such as filtering or string processing operations
have similar functions in pandas.

 
 
 Learn more 

 
 
 
 
 
 
 
 Tutorials # 

 For a quick overview of pandas functionality, see 10 Minutes to pandas .

 You can also reference the pandas cheat sheet 
for a succinct guide for manipulating data with pandas.

 The community produces a wide variety of tutorials available online. Some of the
material is enlisted in the community contributed Community tutorials .

 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 previous

 pandas documentation

 
 
 
 
 next

 Installation

 
 
 
 
 
 
 
 
 
 
 
 

 
 
 On this page
 
 
 
 Installation 

 Intro to pandas 

 Coming from… 

 Tutorials
